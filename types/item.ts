export interface item{
    title:string,
    date: Date
}

export interface locationItem{
    title: string,
    date: Date,
    geometry:{
        type:string,
        coordinates : Array<number>
    }
}