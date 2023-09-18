import { React } from "react";
import { Table } from "react-bootstrap";

const CourseList = ({ courseList, user, handleShow, handleDelete }) => {
  // console.log(courseList);
  return (
    <Table className="mb-5">
      <thead>
        <tr className="text-center">
          <th>Sl No</th>
          <th>Course</th>
          <th>Department</th>
          <th>Description</th>
          {
            user === 'admin' ? <th>Operation</th> : null
          }
        </tr>
      </thead>
      <tbody>
        {courseList.map((data, key) => (
          <tr key={key} className="text-center">
            <td>{key + 1}</td>
            {Object.entries(data).map(([id, value]) =>
              id === "id" ? "" : <td key={id}>{value}</td>
            )}
            {user === "admin" ? (
              <td>
                <button className="op-btn" onClick={(e) => handleShow(e, key)}>
                  Edit
                </button>
                <button className="d-btn" onClick={(e) => handleDelete(e, key)}>
                  Delete
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CourseList;
