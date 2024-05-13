export interface JtwStructure {
  exp: number;
  sub: string;
  id: number;
  tipo: {
    id: number;
    tipo: string;
  };
  clienteId: number;
  clienteRazonSocial: string;
}
