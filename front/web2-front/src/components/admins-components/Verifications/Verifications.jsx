import React, { useEffect, useState } from "react";
import api from "../../../api/apiFront";

const Verifications = () => {
  const [selectedStatus, setSelectedStatus] = useState("verifikovani");
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await api.get("api/Profile/getSellers");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const acceptSeller = (sellerId) => {
    // Implementacija za prihvatanje prodavca
  };

  const rejectSeller = (sellerId) => {
    // Implementacija za odbijanje prodavca
  };

  return (
    <div>
      <h2>Verifications</h2>
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
            {sellers.map((seller) => (
              <tr key={seller.Id}>
                <td>{seller.Id}</td>
                <td>{seller.Username}</td>
                <td>{seller.Email}</td>
                <td>{seller.Firstname}</td>
                <td>{seller.Lastname}</td>
                <td>{new Date(seller.Birthday).toLocaleDateString()}</td>
                <td>{seller.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          {sellers.map((seller) =>
            seller.Status === 1 ? (
              <div key={seller.Id}>
                <p>
                  {seller.Username} - {seller.Email}
                </p>
                <button onClick={() => acceptSeller(seller.Id)}>Prihvati</button>
                <button onClick={() => rejectSeller(seller.Id)}>Odbij</button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Verifications;
