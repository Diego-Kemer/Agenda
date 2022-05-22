export interface Task{
    id?:number;
    titulo: string;
    hora: Date | undefined;
    reminder: boolean;
    activo: boolean
}