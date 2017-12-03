export default ({ title, rootMarkup, initialState }) => {
    return `
    <!doctype html>
    <html>
      <head>
        <title>${ title }</title>
        <link rel="shortcut icon" type="image/png" href="/static/assets/favicon.png">
        <link href="/static/assets/normalize.css" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>
          html {
            height: 100%;
            display: flex;
          }
          body {
            display: flex;
            flex: 1;
            overflow: hidden;
          }
          #root {
            display: flex;
            flex: 1;
          }
          input:focus {
            outline: none;
          }

          ::-webkit-scrollbar {
              width: 8px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
              -webkit-border-radius: 2px;
              border-radius: 2px;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
              -webkit-border-radius: 10px;
              border-radius: 2px;
              background: #838488;
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
          }
          ::-webkit-scrollbar-thumb:window-inactive {
          	background: #838488;
          }
        </style>
      </head>
      <body>
        <div id='root'>${ rootMarkup }</div>
        <script>
          window.BOOTSTRAP_CLIENT_STATE = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/index.js"></script>
      </body>
    </html>
  `;
};
