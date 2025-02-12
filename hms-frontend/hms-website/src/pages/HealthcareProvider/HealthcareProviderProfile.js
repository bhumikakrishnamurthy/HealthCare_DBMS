import React, { Fragment, useState, useEffect } from 'react';
import HealthcareProviderSidebar from '../../components/HealthcareProviderSidebar';

export default function HealthcareProviderProfile() {

  const [adminDetails, setAdminDetails] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    ID: '',
    ContactNumber: '',
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const UserID = sessionStorage.getItem('UserID');

        if (!UserID) {
          console.error('UserID is not available.');
          return;
        }

        const response = await fetch(`http://localhost/hms-backend/api/adminprofile.php/${UserID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log(data); // Log the response data

        // Filter the data to find the user with the matching UserID
        const user = data.find(user => user.ID == UserID);

        if (user) {
          setAdminDetails(user); // Set the filtered user object
        } else {
          console.error('User not found in the response.');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);

    return (
      <Fragment>
        <div className="container-fluid page-body-wrapper">
          <HealthcareProviderSidebar/>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Healthcare Provider Profile</h3>
            </div>
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered mg-b-0">
                        <thead className="table-warning">
                          <tr>
                            <th colSpan="2">Healthcare Provider Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-info">
                            <th>First Name</th>
                            <td>{adminDetails.FirstName || 'Loading...'}</td>
                          </tr>
                          <tr className="table-warning">
                            <th>Last Name</th>
                            <td>{adminDetails.LastName || 'Loading...'}</td>
                          </tr>
                          <tr className="table-danger">
                            <th>Email ID</th>
                            <td>{adminDetails.Email || 'Loading...'}</td>
                          </tr>
                          <tr className="table-success">
                            <th>User ID</th>
                            <td>{adminDetails.ID || 'Loading...'}</td>
                          </tr>
                          <tr className="table-primary">
                            <th>Contact Number</th>
                            <td>{adminDetails.ContactNumber || 'Loading...'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
    );
}