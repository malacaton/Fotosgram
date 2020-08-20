export interface FileUpload {
  name: string;
  data: any;
  encoding: string;
  size: number;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;

  mv: Function; // le indicamos que tendrá una función que se llamará 'mv'
}