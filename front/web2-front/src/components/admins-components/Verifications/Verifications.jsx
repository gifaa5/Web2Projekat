import React, { useEffect, useState } from "react";
import api from "../../../api/apiFront";

const Verifications = () => {
  const [selectedStatus, setSelectedStatus] = useState("verifikovani");
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await api.get("api/Profile/getSellers");
        setSellers(response.data.$values);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  useEffect(() => {
    filterSellers(selectedStatus);
  }, [selectedStatus, sellers]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filterSellers = (status) => {
    if (status === "verifikovani") {
      setFilteredSellers(sellers.filter((seller) => seller.status === 2));
    } else if (status === "neverifikovani") {
      setFilteredSellers(sellers.filter((seller) => seller.status === 1));
    }
  };

  const acceptSeller = async (sellerId) => {
    try {
      await api.post("api/Profile/verifySeller", {
        id: sellerId,
        status: 2, // Prihvacen status
      });
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller.id === sellerId ? { ...seller, status: 2 } : seller
        )
      );
    } catch (error) {
      console.error("Error accepting seller:", error);
    }
  };

  const rejectSeller = async (sellerId) => {
    try {
      await api.post("api/Profile/verifySeller", {
        id: sellerId,
        status: 0, // Odbijen status
      });
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.id !== sellerId)
      );
    } catch (error) {
      console.error("Error rejecting seller:", error);
    }
  };

  return (
    <div>
      <h2 className="heading">Verifications</h2>
      <label>
        Status:
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="verifikovani">Verifikovani</option>
          <option value="neverifikovani">Neverifikovani</option>
        </select>
      </label>

      {selectedStatus === "verifikovani" ? (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Birthday</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{seller.username}</td>
                <td>{seller.email}</td>
                <td>{seller.firstname}</td>
                <td>{seller.lastname}</td>
                <td>{new Date(seller.birthday).toLocaleDateString()}</td>
                <td>{seller.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          {filteredSellers.map((seller) => (
            <div key={seller.id}>
              <p>
                {seller.username} - {seller.email}
              </p>
              <button onClick={() => acceptSeller(seller.id)}>Prihvati</button>
              <button onClick={() => rejectSeller(seller.id)}>Odbij</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Verifications;
