export interface JtwStructure {
  exp: string;
  sub: string;
  id: number;
  tipo: {
    id: number;
    tipo: string;
  };
  clienteId: number;
  clienteRazonSocial: string;
}
