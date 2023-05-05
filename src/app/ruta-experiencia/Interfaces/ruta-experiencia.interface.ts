export interface Experiencia {
    IdExperiencia: number;
    ExNombre: string;
    ExDescripcion: string;
    ExCicloInicio: number;
    ExCicloFin: number;
    ExFila: number;
    ExIconoUrl: string;
    IdCarrera: number;
}

export interface AbrirForm {
    modal: boolean,
    funcion: 'agregar' | 'editar'
    experiencia: Experiencia
}
export interface Contenido {
    IdContenido:   number;
    CoTitulo:      string;
    CoDescripcion: string;
    CoUrlMedia:    string;
    IdTipoMedia:   number;
    IdExperiencia: number;
}