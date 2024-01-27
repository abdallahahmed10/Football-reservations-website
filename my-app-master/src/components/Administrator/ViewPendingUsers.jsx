import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Footer from "../Footer";
import AdminNavBar from "./AdminNavBar";

function ViewPendingUsers() {
  const [dataArray, setDataArray] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/v1/users/pending");
      if (!response.ok) {
        console.error("Failed to fetch data:", response.statusText);
        return;
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        username: item.username,
        email: item.email_address || "",
        fan: item.fan,
      }));
      setDataArray(formattedData);
      if (formattedData.length === 0) {
        console.log("No pending requests");
      } else {
        console.log("Fetched data:", formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (index) => {
    try {
      const userToAccept = dataArray[index];
      userToAccept.approval = true;
      const response = await fetch(`http://localhost:8080/v1/users/approve/${userToAccept.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToAccept),
      });
      if (!response.ok) {
        console.error('Failed to accept user:', response.statusText);
        return;
      }
      console.log('User accepted successfully:', userToAccept);
    } catch (error) {
      console.error('Error accepting user:', error);
    }
    fetchData();
  };

  const handleReject = async (index) => {
    try {
      const userToReject = dataArray[index];
      const response = await fetch(`http://localhost:8080/v1/users/${userToReject.username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rejected: true }),
      });

      if (!response.ok) {
        console.error('Failed to reject user:', response.statusText);
        return;
      }

      console.log('User rejected successfully:', userToReject);
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
    fetchData();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1, overflowY: "hidden" }}>
        <AdminNavBar />
        <div style={{ textAlign: "center", margin: "20px 50px", overflowY: "auto", maxHeight: "500px" }}>
          <h1 style={{ color: "white" }}>Pending Users</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Fan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.fan ? "Yes" : "No"}</td>
                  <td>
                    <Button variant="success" onClick={() => handleAccept(index)} style={{ marginRight: "10px" }}>
                      Accept
                    </Button>
                    <Button variant="danger" onClick={() => handleReject(index)}>
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div style={{ margin: "20px 0" }}></div>
      <Footer />
    </div>
  );
}

export default ViewPendingUsers;
