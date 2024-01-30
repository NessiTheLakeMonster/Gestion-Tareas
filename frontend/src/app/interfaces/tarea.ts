export interface Tareas {
    resultado: Array<Tarea>;
    ok: boolean;
}

export interface Tarea {
    id: number;
    descripcion: string;
    dificultad: string;
    horas_previstas: number;
    horas_realizadas: number;
    realizacion: string;
    completada: boolean;
    createdAt: Date;
    updatedAt: Date;
}