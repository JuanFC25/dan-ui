// const MS_PRODUCTOS = "http://localhost:3000";
// const MS_PEDIDOS = "http://localhost:8081";
// const MS_USUARIOS = "http://localhost:8080";
// const MS_PAGOS = "http://localhost:8082";

const API_GATEWAY = "http://localhost";

// Categoria
// export const API_GET_CATEGORIAS = `${MS_PRODUCTOS}/api/categoria/all`;
// export const API_GET_CATEGORIA = `${MS_PRODUCTOS}/api/categoria`;
//para gateway
export const API_GET_CATEGORIAS = `${API_GATEWAY}/api/categoria/all`;
export const API_GET_CATEGORIA = `${API_GATEWAY}/api/categoria`;

// Proveedor
// export const API_GET_PROVEEDORES = `${MS_PRODUCTOS}/api/proveedor/all`;
// export const API_GET_PROVEEDOR = `${MS_PRODUCTOS}/api/proveedor`;
//para gateway
export const API_GET_PROVEEDORES = `${API_GATEWAY}/api/proveedor/all`;
export const API_GET_PROVEEDOR = `${API_GATEWAY}/api/proveedor`;

// Producto

// export const API_GET_PRODUCTOS = `${MS_PRODUCTOS}/api/producto`;
// export const API_ADD_PRODUCTO = `${MS_PRODUCTOS}/api/producto`;
//para gateway
export const API_GET_PRODUCTOS = `${API_GATEWAY}/api/producto`;
export const API_ADD_PRODUCTO = `${API_GATEWAY}/api/producto`;

// Orden Provision

// export const API_GET_ORDENES_PROVISION = `${MS_PRODUCTOS}/api/orden-provision`;
//para gateway
export const API_GET_ORDENES_PROVISION = `${API_GATEWAY}/api/orden-provision`;

//Pedidos

// export const API_PEDIDO = `${MS_PEDIDOS}/api`;
//para gateway
export const API_PEDIDO = `${API_GATEWAY}`;

//PAGO
// export const API_PAGO = `${MS_PAGOS}/api/pago`;
//para gateway
export const API_PAGO = `${API_GATEWAY}/api/pago`;

//USUARIOS
// export const API_USUARIO = `${MS_USUARIOS}/api/auth`;
//para gateway
export const API_USUARIO = `${API_GATEWAY}/api/auth`;
