import React from "react";
import { Link } from "react-router";

/**
 * @typedef {Object} SurveyResponse
 * @property {string} name - Respondent's name.
 * @property {number | string} age - Respondent's age.
 * @property {string} gender - Respondent's gender.
 * @property {string} smoke - Smoking status.
 * @property {string} merkSmoke - Cigarette brands in string format.
 */

const STORAGE_KEY = "surveyResponses";

/**
 * Gets saved survey responses from localStorage.
 *
 * @returns {SurveyResponse[]} Saved survey responses.
 */
function getSurveyResponses() {
  const savedData = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  return savedData;
}

/**
 * Removes all saved survey responses from localStorage.
 *
 * @returns {void}
 */
function clearSurveyResponses() {
  window.localStorage.removeItem(STORAGE_KEY);
}

/**
 * Gets table row style based on row index.
 *
 * @param {number} index - Current row index.
 * @returns {string} Tailwind classes for table row.
 */
function getRowClassName(index) {
  if (index % 2 === 0) {
    return "bg-purple-900 text-white";
  }

  return "bg-gray-50 text-gray-900";
}

function TableResponse() {
  const [surveyResponses, setSurveyResponses] = React.useState(() =>
    getSurveyResponses()
  );

  /**
   * Handles clearing all survey response data.
   *
   * @returns {void}
   */
  function handleClearData() {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus semua data survey?"
    );

    if (!isConfirmed) {
      return;
    }

    clearSurveyResponses();
    setSurveyResponses([]);
  }

  return (
    <main className="min-h-screen bg-pink-200 p-6 font-sans">
      <div className="mx-auto rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="mb-5 text-2xl font-bold text-blue-600">
          Tabel Survey Perokok
        </h1>

        <div className="mb-5 w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="row-container">No</th>
                <th className="row-container">Nama</th>
                <th className="row-container">Umur</th>
                <th className="row-container">Jenis Kelamin</th>
                <th className="row-container">Perokok</th>
                <th className="row-container">Merk Rokok</th>
              </tr>
            </thead>

            <tbody>
              {surveyResponses.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="border border-gray-300 p-5 text-center text-gray-500"
                  >
                    Belum ada data survey.
                  </td>
                </tr>
              ) : (
                surveyResponses.map((data, index) => (
                  <tr key={`${data.name}-${index}`} className={getRowClassName(index)}>
                    <td className="row-container">
                      {index + 1}
                    </td>
                    <td className="row-container">
                      {data.name}
                    </td>
                    <td className="row-container">
                      {data.age}
                    </td>
                    <td className="row-container">
                      {data.gender || "-"}
                    </td>
                    <td className="row-container">
                      {data.smoke || "-"}
                    </td>
                    <td className="row-container">
                      {data.merkSmoke || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded bg-blue-500 px-4 py-2.5 text-sm font-bold text-white no-underline hover:bg-blue-600"
          >
            Kembali ke Form
          </Link>

          <button
            type="button"
            onClick={handleClearData}
            className="btn bg-red-600 px-4 py-2.5 font-bold text-white hover:bg-red-700"
          >
            Hapus Semua Data
          </button>
        </div>
      </div>
    </main>
  );
}

export default TableResponse;