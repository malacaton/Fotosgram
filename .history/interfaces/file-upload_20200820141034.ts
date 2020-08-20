export interface FileUpload {
  name: string;
  data: any;
  encoding: string;
  size: Number;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}