export class SuggestionModel{
    Sug_PkeyID: Number = 0;
    Sug_Tittle: String = '';
    Sug_Description: String = '';
    Sug_UserID: Number = 0;
    Sug_IsActive: Boolean = true;
    Sug_IsDelete: Boolean = false;
    UserID: Number = 0;
    Type: Number = 1;
    WhereClause: String = '';
    PageNumber : number = 1;
    NoofRows:number = 5;
}

export class SuggestionVoteModel{
    Sug_Vote_PkeyID: Number = 0;
    Sug_Vote_UserID: Number = 0;
    Sug_Vote_Sug_PkeyID: Number = 0;
    Sug_Vote_Val: Boolean = true;
    Sug_Vote_IsActive: Boolean = true;
    Sug_Vote_IsDelete: Boolean = false;
    UserID: Number = 0;
    Type: Number = 1;
}