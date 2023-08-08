export const PATH_NAME=process.env.REACT_APP_PATHNAME;
export const E_BAHOLASH=process.env.REACT_APP_E_BAHOLASH;

export const SITE_LANG="language"
export const CHANGE_TEXT_TO_NUMBER=(item)=>{
    return item?.toFixed(2)?.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( " " )?.replace('.', ',')
}

export const CHANGE_REPORT_TYPE=(item)=>{
    return item?.substring(0,5)+'  '+ item?.substring(5,8)+'  '+ item?.substring(8,9)+'  '+ item?.substring(9,17)+'  '+ item?.substring(17)
}