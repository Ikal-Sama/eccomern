import React, { useEffect, useState } from "react";
import "./OrdersPage.css";
import { useSelector } from "react-redux";
import { Badge, Container, Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h3 className="text-center pt-3">No orders yet</h3>;
  }

  function TableRow({ _id, status, date, total }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>
          <Badge
            bg={`${status == "proccessing" ? "warning" : "success"}`}
            text="white"
          >
            {status}
          </Badge>
        </td>
        <td>{date}</td>
        <td>{total}</td>
      </tr>
    );
  }

  return (
    <Container>
      <h1 className="text-center">Your orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Order_ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={9}
            tablePagination={true}
          />
        </tbody>
      </Table>
    </Container>
  );
}

export default OrdersPage;
