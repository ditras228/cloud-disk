export interface IFile {
  id: number;
  name: string;
  type: string;
  access_link: string;
  size: number;
  path: string;
  user_id: number;
  data: string;
  parent_id: number;
  is_share: boolean;
}
