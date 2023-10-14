export class LiveMapModel {
  // gpsLatitude: Number = 0;
  // gpsLongitude : Number = 0;
  // Type: Number = 6;
  IPL_PkeyID: Number = 0;
  IPL_Primary_Zip_Code: Number = 0;
  IPL_Primary_Latitude: String = '';
  IPL_Primary_Longitude: String = '';
  IPL_UserID: Number = 0;
  IPL_Address: String = '';
  IPL_State: String = '';
  IPL_IsActive: String = '';
  Con_Cat_Name: String = '';
  Con_Cat_Back_Color: String = '';
  Con_Cat_Icon: String = '';
  UserID: Number = 0;
  Type: Number;
}

export interface Location {
  cellNumber: string;
  latitude: string;
  longitude: string;
  loggedTime?: any;
  name: string;
}
