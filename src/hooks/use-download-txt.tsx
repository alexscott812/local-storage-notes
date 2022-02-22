import { useCallback } from "react";

const useDownloadTxt = ( text: string ) => {

  const onDownload = useCallback((): void => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "notes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }, [text]);

  return { onDownload };
};

export default useDownloadTxt;