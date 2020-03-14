import React from "react";
import GoogleDocsViewer from "react-google-docs-viewer";

class Pdf extends React.Component {
  render() {
    return (
      <GoogleDocsViewer
        width="600px"
        height="780px"
        fileUrl=".https://drive.google.com/file/d/1Cx2lpbxcmjrAVIRWxsGVlsnCpqVM5o-8/view?usp=sharing"
      />
    );
  }
}

export default Pdf;
