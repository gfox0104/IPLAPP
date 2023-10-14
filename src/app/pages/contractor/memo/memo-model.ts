import { FileInfo } from "@progress/kendo-angular-upload";
export class SaveTemplateModel{
    ST_content: string = '';
    ST_name: String = '';
}
export class SaveMailModel{
    ST_group: Number = 47;
    ST_user_id: Number = 0;
    ST_dateTime: Date;
    ST_subject: String = '';
    ST_email_from: String = 'arsha@gmail.com';
    filepath: string;
    filename: string;
    ST_content: string = '';
    ST_delete: Boolean = false;
    ST_active: Boolean = true;
}
export class MassTemplateModel{
    Mass_Template_PkeyId: Number = 0;
    Mass_Template_Subject: String = '';
    Mass_Template_Contant: String = '';
    Mass_Template_IsActive: Boolean = true;
    Mass_Template_IsDelete: Boolean = false;
    UserID: Number = 0;
    Type: Number = 1;
}
