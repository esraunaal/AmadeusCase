import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';

function SearchBox({ onSearch }) {
  const [airports, setAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [oneWay, setOneWay] = useState(false);
  const [selectedFromAirport, setSelectedFromAirport] = useState('');
  const [selectedToAirport, setSelectedToAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    // Burada fetch işleminiz gerçek veri ile değiştirilmelidir
    fetch('http://localhost:3001/flights')
      .then((response) => response.json())
      .then((data) => {
        const uniqueFromAirports = Array.from(new Set(data.map((flight) => flight.from)));
        const uniqueToAirports = Array.from(new Set(data.map((flight) => flight.to)));
        setAirports(uniqueFromAirports); 
        setToAirports(uniqueToAirports); 
      })
      .catch((error) => console.error('Error fetching airports:', error));
  }, []);

  const handleOneWayChange = (e) => {
    setOneWay(e.target.checked);
    if (e.target.checked) {
      setReturnDate(''); 
    }
  };

  const isFormValid = () => {
    return selectedFromAirport && selectedToAirport;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Lütfen gidiş ve varış havaalanlarını seçiniz.');
      return;
    }
    setLoading(true);

    onSearch({
      from: selectedFromAirport,
      to: selectedToAirport,
      departureDate: departureDate,
      returnDate: oneWay ? '' : returnDate
    });

    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={3}>
          <Form.Group controlId="fromAirport">
            <Form.Label>Kalkış Havaalanı</Form.Label>
            <Form.Select
              value={selectedFromAirport}
              onChange={(e) => setSelectedFromAirport(e.target.value)}
            >
              <option>Seçiniz...</option>
              {airports.map((airport, index) => (
                <option key={index} value={airport}>
                  {airport}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="toAirport">
            <Form.Label>Varış Havaalanı</Form.Label>
            <Form.Select
              value={selectedToAirport}
              onChange={(e) => setSelectedToAirport(e.target.value)}
            >
              <option>Seçiniz...</option>
              {toAirports.map((toAirport, index) => (
                <option key={index} value={toAirport}>
                  {toAirport}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form.Group controlId="departureDate">
            <Form.Label>Kalkış Tarihi</Form.Label>
            <Form.Control 
              type="date" 
              value={departureDate} 
              onChange={(e) => setDepartureDate(e.target.value)} 
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="returnDate">
            <Form.Label>Dönüş Tarihi</Form.Label>
            <Form.Control 
              type="date" 
              value={returnDate} 
              onChange={(e) => setReturnDate(e.target.value)} 
              disabled={oneWay} 
            />
          </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col md={3} className="d-flex align-items-end md-100">
          <Form.Group controlId="oneWay">
            <Form.Check type="checkbox" label="Tek yönlü uçuş" onChange={handleOneWayChange} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Ara'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;