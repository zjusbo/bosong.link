const IS_PROD: boolean = true;

export const SERVER_BASE = IS_PROD? "http://bosong.link": "http://localhost";
export const EDIT_API = SERVER_BASE + (IS_PROD? "/edit" : "/redirect.php?url=edit");