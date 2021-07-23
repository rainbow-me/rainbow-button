import React from "react";

const createMarkup = () => {
    return {__html: (
        `<html id="html">
  <head>
	<title>Rainbow Button</title>
		<meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="../rainbow-buttons/2/style.css">
	<script src="../rainbow-buttons/2/mobile-helper.js"></script>
	<script defer src="../rainbow-buttons/2/emoji-pop.js"></script>
  </head>
  <body>
	  <div id="content">
		  <div id="rainbow-button">
			  <div id="rainbow-button-inner"><img src="../rainbow-buttons/2/rainbow-logo.png" width="34" /><div id="../rainbow-buttons/2/rainbow-button-label"></div></div>
			</div>
	  </div>
  </body>
</html>`
    )};
  }
  
const Button = () => {
    return (
      <div className="screen-share">
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
}
export default Button;