import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
export default function Admin() {
  const [expandedRow, setExpandedRow] = useState(null);

  const statusRefs = useRef([]);

  useEffect(() => {
    statusRefs.current.forEach((selectElement) => {
      if (selectElement) {
        const updateSelectColor = () => {
          const selectedOption =
            selectElement.options[selectElement.selectedIndex];
          selectElement.className =
            "form-select custom-select " + selectedOption.className;
        };

        updateSelectColor();
        selectElement.addEventListener("change", updateSelectColor);

        return () => {
          selectElement.removeEventListener("change", updateSelectColor);
        };
      }
    });
  }, []);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const issues = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum deserunt et aperiam consectetur excepturi!",
    "@twitter",
  ];

  const users = ["Mark", "Larry the Bird"];

  return (
    <Layout>
      <table className="container table table-hover mt-2">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Sl. No.
            </th>
            <th scope="col" className="text-center">
              User Name
            </th>
            <th scope="col" className="text-center">
              Issues
            </th>
            <th scope="col" className="text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleRowClick(index)}
                style={{ cursor: "pointer" }}
              >
                <th scope="row">{index + 1}</th>
                <td>{users[index]}</td>
                <td>{issue}</td>
                <td>
                  <select
                    name="status"
                    ref={(el) => (statusRefs.current[index] = el)}
                    className="form-select"
                    defaultValue="notViewed"
                  >
                    <option value="notViewed" className="bg-danger text-light">
                      Not Viewed
                    </option>
                    <option value="onProgress" className="bg-warning text-dark">
                      On Progress
                    </option>
                    <option value="resolved" className="bg-success text-light">
                      Resolved
                    </option>
                  </select>
                </td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td>Solution: </td>
                  <td colSpan="2">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Resolve this issue"
                    ></textarea>
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary">
                      Submit
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
