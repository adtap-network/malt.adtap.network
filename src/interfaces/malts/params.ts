export default interface ParamsMaltInterface {

    action: string;
    mode: string;
    search: boolean; 
    route: string;
    flags: boolean; 
    task: string;
    nonce: number;
    jwt: string;
    format: string;
    keywords: string;
    [key: string]: any;

}