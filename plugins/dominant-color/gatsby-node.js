const fs = require('fs');

const DC = require('dominant-color');

const defaultOptions = {
  extensions: ['jpg', 'png'],
  exclude: []
};

exports.onCreateNode = async ({
  node,
  actions
}, pluginOptions) => {
  const options = Object.assign({}, { ...defaultOptions,
    ...pluginOptions
  });

  if (options && options.extensions && options.exclude && options.extensions.indexOf(node.extension) !== -1 && options.exclude.indexOf(`${node.name}${node.ext}`) === -1) {
    // Transform the new node here and create a new node or
    // create a new node field.
    await DC(node.absolutePath, (err, color) => {
      node.dominantColor = {
        color: '#' + color
      };
    });
  }
};

exports.onPreExtractQueries = async ({
  store,
  getNodesByType
}) => {
  console.log('pre')
  const program = store.getState().program; // Check if there are any File nodes. If so add fragments for File.
  // The fragment will cause an error if there are no File nodes.

  if (getNodesByType(`File`).length == 0) {
    return;
  } // We have File nodes so let's add our fragments to .cache/fragments.


  await fs.copyFile(require.resolve(`${__dirname}/src/fragments.js`), `${program.directory}/.cache/fragments/dominant-color.js`, err => {
    if (err) throw err;
  });
};