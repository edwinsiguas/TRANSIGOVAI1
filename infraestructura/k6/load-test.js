import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 }, // Rampa de subida a 20 usuarios
    { duration: '20s', target: 20 }, // Mantener 20 usuarios
    { duration: '10s', target: 0 },  // Rampa de bajada
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de las peticiones deben responder en menos de 500ms
  },
};

export default function () {
  // Apuntamos al endpoint de la documentación como prueba base de disponibilidad
  const res = http.get('http://localhost:8080/v3/api-docs');
  check(res, {
    'status es 200': (r) => r.status === 200,
  });
  sleep(1);
}

