export interface MetaInterface{
    per_page: number,
    total: number,
    current_page: number
}

export interface MetaLinksInterface{
    prev: string,
    next: string,
}

export interface ResponseInterface{
    meta: MetaInterface,
    links: MetaLinksInterface
    data: any[],
}




export const MetaEntity = {
    per_page: 0,
    total: 0,
    current_page: 0,
}


export const MetaLinksEntity = {
    prev: "",
    next: "",
}