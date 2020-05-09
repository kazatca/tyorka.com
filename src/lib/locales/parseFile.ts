import * as fs from 'fs';
import * as ts from 'typescript';
import * as cJson from 'comment-json';

interface Annotaion {
  context?: string
}

function isTranslated(node: ts.Node, sourceFile: ts.SourceFile): Annotaion | undefined {
  const comments = ts.getLeadingCommentRanges(sourceFile.getFullText(), node.getFullStart());
  if (!comments) {
    return;
  }
  const comment = comments.pop();
  if(!comment){
    return;
  }
  const match = sourceFile.text
    .substring(comment.pos, comment.end)
    .replace(/\s+/g, '')
    .match(/\/\/@translate(\((context\:([a-zA-Z0-9]+))\))?/);
  if(!match){
    return;
  }
  if(match[1] && match[2]){
    return {context: match[3].trim()};
  }
  return {};
}

function isCallOfT(node: ts.Node) {
  if(node.kind !== ts.SyntaxKind.CallExpression){
    return false;
  }
  const call = node as ts.CallExpression;
  return (
    call.getText().match(/(this\.props\.|props\.|^)t\(/) &&
    call.arguments &&
    call.arguments.length >= 1 &&
    call.arguments[0].kind === ts.SyntaxKind.StringLiteral
  );
}

function getTokenFromTransComponent(node: ts.Node) {
  if(node.kind !== ts.SyntaxKind.JsxOpeningElement){
    return;
  }
  const tag = node as ts.JsxOpeningElement;
  if (tag.tagName.getText() !== 'Trans') {
    return;
  }
  const prop = tag.attributes.properties.find(
    attr => !!attr.name && attr.name.getText() === 'i18nKey'
  );
  if (
    !prop 
    || prop.kind !== ts.SyntaxKind.JsxAttribute 
    || !prop.initializer
    || prop.initializer.kind !== ts.SyntaxKind.StringLiteral
  ) {
    return
  };
  return prop.initializer.text;
}


export function parse(program: ts.Program, fileName: string): string[] {
  let tokens: string[] = [];
  const sourceFile = program.getSourceFile(fileName)!;
  const checker = program.getTypeChecker();

  function addTokens(newTokens: string[], annotation?: Annotaion) {
    const result = (
      !annotation || !annotation.context 
      ? newTokens
      : newTokens.map(token => `${token}_${annotation.context}`)
    );
    tokens = tokens.concat(result)
  }

  if(!sourceFile){
    console.log('sourceFile is undefined')
    return [];
  }

  function visit(node: ts.Node) {
    switch (node.kind) {
      /*
        // @translate
        enum Size {
          Big = "BIG"
          Small = "SMALL"
        }
        will be produced to  tokens ["BIG", "SMALL"]
      */
      case ts.SyntaxKind.EnumDeclaration: {
        const annotation = isTranslated(node, sourceFile)
        if (annotation) {
          const enumDecl = node as ts.EnumDeclaration;
          const members = enumDecl.members
            .map(member => {
              if(
                !member.initializer
                || member.initializer.kind !== ts.SyntaxKind.StringLiteral
              ){
                return;
              }
              const str = member.initializer as ts.StringLiteral;
              return str.text
            })
            .filter(Boolean) as string[];
          addTokens(members, annotation);
        }
        break;
      }

      /*
        t('token')
        or props.t('token')
        or this.props.t('token')

        will be produced to tokens ['token']
      */
      case ts.SyntaxKind.CallExpression:
        if (isCallOfT(node)) {
          const call = node as ts.CallExpression;
          const token = call.arguments[0] as ts.StringLiteral
          addTokens([token.text]);
        }
        break;

      /*
        import {
          // @translate
          Rainbow
        } from 'types'
      */
      case ts.SyntaxKind.ImportSpecifier:
      /*
        export {
          // @translate
          Rainbow
        } from 'types'
      */
      case ts.SyntaxKind.ExportSpecifier:
      /*
        // @translate  
        type Rainbow = 'red' | 'orange' | ...

        all it will be produced to tokens ['red', 'orange', ...]
      */
      case ts.SyntaxKind.TypeAliasDeclaration: {
        const annotation = isTranslated(node, sourceFile)
        if (annotation) {
          const decl = node as ts.ImportSpecifier;
          const symbol = checker.getSymbolAtLocation(decl.name);
          if(!symbol){
            break;
          }
          const type = checker.getDeclaredTypeOfSymbol(symbol) as ts.LiteralType | ts.UnionOrIntersectionType;
          if (type.isLiteral()) {
            const lt = (type as ts.LiteralType);
            if(typeof lt.value === 'string'){
              addTokens([lt.value], annotation);
            }
          }
          if(type.isUnion()){
            const union = type as ts.UnionType;
            const members = union.types
              .map(type => type.isLiteral() && type.value)
              .filter(Boolean) as string[];
            addTokens(members, annotation);
          }
        }
        break;
      }

      /*
        <Trans i18nKey='token'>Some text</Trans>
        will be produced to tokens ['token']
      */
      case ts.SyntaxKind.JsxOpeningElement:
        const token = getTokenFromTransComponent(node);
        if (token) tokens.push(token);
    }
    ts.forEachChild(node, visit);
  }

  sourceFile.forEachChild(node => visit(node));
  return tokens;
}

function readTsConfig(fileName: string) {
  const content = fs.readFileSync(fileName, 'utf-8');
  return cJson.parse(content);
}

export function parseFiles(files: string[], tsconfigFile: string) {
  const program = ts.createProgram(files, readTsConfig(tsconfigFile));
  let tokens = files.reduce((result, fileName) => result.concat(parse(program, fileName)), [] as string[]);
  let plurals: string[] = [];
  tokens.forEach(token => {
    if (token.match(/{{count}}/)) {
      plurals = plurals.concat([`${token}_0`, `${token}_1`, `${token}_2`, `${token}_plural`]);
    }
  });
  tokens = tokens.concat(plurals);
  return tokens;
}