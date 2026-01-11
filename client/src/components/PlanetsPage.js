import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlanetRow = ({ planet, onDelete }) => {
  // Make Habitable display nicely whether it's "Yes"/"No", true/false, or missing.
  const habitableText =
    planet.Habitable === true
      ? "Yes"
      : planet.Habitable === false
      ? "No"
      : planet.Habitable || "—";

  return (
    <tr>
      <td>{planet.name || "—"}</td>
      <td>{planet.Ecosystem || "—"}</td>
      <td>{habitableText}</td>
      <td>
        <Link className="btn btn-sm btn-primary" to={`/edit/${planet._id}`}>
          Edit
        </Link>

        <button
          className="btn btn-sm btn-danger ms-2"
          onClick={() => onDelete(planet._id)}
          disabled={!planet._id}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch planets once on mount
  useEffect(() => {
    let cancelled = false;

    async function getPlanets() {
      try {
        const response = await fetch("/api/planets"); // ✅ prefer lowercase
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        if (!cancelled) {
          setPlanets(data);
          setLoading(false);
          // Optional debugging:
          // console.log("planets:", data);
        }
      } catch (err) {
        if (!cancelled) {
          setLoading(false);
          window.alert(`An error occurred: ${err.message}`);
        }
      }
    }

    getPlanets();

    return () => {
      cancelled = true;
    };
  }, []);

  // Delete a planet
  async function deletePlanet(id) {
    if (!id) return;

    try {
      const response = await fetch(`/api/planets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setPlanets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      window.alert(`Delete failed: ${err.message}`);
    }
  }

  function renderRows() {
    if (loading) {
      return (
        <tr>
          <td colSpan={4}>Loading…</td>
        </tr>
      );
    }

    if (!planets.length) {
      return (
        <tr>
          <td colSpan={4}>No planets found.</td>
        </tr>
      );
    }

    return planets.map((planet) => (
      <PlanetRow key={planet._id} planet={planet} onDelete={deletePlanet} />
    ));
  }

  return (
    <div>
      <h3>Planet List</h3>

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ecosystem</th>
            <th>Habitable</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}
