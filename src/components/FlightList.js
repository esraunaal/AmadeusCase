import React from 'react';
import { Table, Spinner } from 'react-bootstrap';

function FlightList({ flights }) {
  
  if (!flights.length) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Yükleniyor...</span>
    </Spinner>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nereden</th>
            <th>Nereye</th>
            <th>Kalkış Tarihi</th>
            <th>Dönüş Tarihi</th>
            <th>Uçuş Süresi</th>
            <th>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.departure}</td>
              <td>{flight.return || 'N/A'}</td>
              <td>{flight.duration}</td>
              <td>{flight.price} ₺</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FlightList;
