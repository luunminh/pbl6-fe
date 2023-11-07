export type UploadImagePayload = {
  file: File;
  object?: string;
  type: 'admin/files' | 'files/profiles';
};

export type UploadImageResponse = {
  url: string;
};
