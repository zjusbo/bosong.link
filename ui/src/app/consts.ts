import * as fromEnvironment from '../environments/environment';

export const SERVER_BASE = fromEnvironment.environment.production? "http://bosong.link": "http://localhost";
export const EDIT_API = SERVER_BASE + (fromEnvironment.environment.production? "/edit" : "/redirect.php?url=edit");