import { useStaticQuery, graphql } from "gatsby";
import { MdQuery } from '../../gatsby-graphql';

type N<T> = NonNullable<T>;

type MD = MdQuery['allMarkdownRemark']['edges'][number]['node']

interface Description {
  [lng: string]: MD
}

export const useDescription = (productName: string, lng: string) => {
  const data = useStaticQuery<MdQuery>(graphql`
    query MD {
      allMarkdownRemark{
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              path
            }
            html
          }
        }
      }
    }
  `);
  const pattern = new RegExp(`\/${productName}\/${lng}\.md$`, 'i');

  const result = data.allMarkdownRemark.edges.find(({ node }) => 
    !!pattern.test(node.fileAbsolutePath || '')
  );

  return {
    title: result?.node.frontmatter?.title || '',
    html: result?.node.html || ''
  }
}