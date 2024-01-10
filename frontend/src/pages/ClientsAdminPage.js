import React, { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "../components/Loading";
import { Table } from "react-bootstrap";
import Pagination from "../components/Pagination";

function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length == 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

  function TableRow({ _id, name, email }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{email}</td>
      </tr>
    );
  }
  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Client_ID</th>
            <th>Client Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={users}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>
    </>
  );

  //   return <div>ClientsAdminPage</div>;
}

export default ClientsAdminPage;
