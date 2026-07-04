import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function MedicineTable({
  medicines,
  setMedicines,
}) {
  const emptyMedicine = {
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  };

  const [medicine, setMedicine] =
    useState(emptyMedicine);

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value,
    });
  };

  const addMedicine = () => {
    if (
      !medicine.medicineName ||
      !medicine.dosage ||
      !medicine.frequency ||
      !medicine.duration
    ) {
      return;
    }

    setMedicines([
      ...medicines,
      medicine,
    ]);

    setMedicine(emptyMedicine);
  };

  const removeMedicine = (index) => {
    setMedicines(
      medicines.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-6">

      <h2 className="mb-6 text-xl font-bold">
        Medicines
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <input
          name="medicineName"
          value={medicine.medicineName}
          onChange={handleChange}
          placeholder="Medicine Name"
          className="rounded-xl border p-3"
        />

        <input
          name="dosage"
          value={medicine.dosage}
          onChange={handleChange}
          placeholder="Dosage (500 mg)"
          className="rounded-xl border p-3"
        />

        <input
          name="frequency"
          value={medicine.frequency}
          onChange={handleChange}
          placeholder="Frequency"
          className="rounded-xl border p-3"
        />

        <input
          name="duration"
          value={medicine.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="rounded-xl border p-3"
        />

      </div>

      <textarea
        name="instructions"
        value={medicine.instructions}
        onChange={handleChange}
        rows={3}
        placeholder="Instructions"
        className="mt-4 w-full rounded-xl border p-3"
      />

      <button
        type="button"
        onClick={addMedicine}
        className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        <Plus size={18} />

        Add Medicine

      </button>

      {medicines.length > 0 && (
        <div className="mt-8 overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Medicine
                </th>

                <th className="py-3 text-left">
                  Dosage
                </th>

                <th className="py-3 text-left">
                  Frequency
                </th>

                <th className="py-3 text-left">
                  Duration
                </th>

                <th className="py-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {medicines.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="py-4">
                      {
                        item.medicineName
                      }
                    </td>

                    <td>
                      {item.dosage}
                    </td>

                    <td>
                      {
                        item.frequency
                      }
                    </td>

                    <td>
                      {
                        item.duration
                      }
                    </td>

                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          removeMedicine(
                            index
                          )
                        }
                        className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}