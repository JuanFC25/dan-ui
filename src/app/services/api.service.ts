const MS_PRODUCTOS = "http://localhost:3000";
const MS_PEDIDOS = "http://localhost:8081";
const MS_USUARIOS = "http://localhost:8080";
const MS_PAGOS = "http://localhost:8082";

// Categoria
export const API_GET_CATEGORIAS = `${MS_PRODUCTOS}/categoria/all`;
export const API_GET_CATEGORIA = `${MS_PRODUCTOS}/categoria`;

// Proveedor
export const API_GET_PROVEEDORES = `${MS_PRODUCTOS}/proveedor/all`;
export const API_GET_PROVEEDOR = `${MS_PRODUCTOS}/proveedor`;

// Producto

export const API_GET_PRODUCTOS = `${MS_PRODUCTOS}/producto`;
export const API_ADD_PRODUCTO = `${MS_PRODUCTOS}/producto`;

// Orden Provision

export const API_GET_ORDENES_PROVISION = `${MS_PRODUCTOS}/orden-provision`;

//Pedidos

export const API_PEDIDO = `${MS_PEDIDOS}`;

//PAGO
export const API_PAGO = `${MS_PAGOS}/api/pago`;

//USUARIOS
export const API_USUARIO = `${MS_USUARIOS}/api/auth`;
