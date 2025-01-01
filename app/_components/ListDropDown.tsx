import { useState, useEffect } from "react";
import { IFullActivityList } from "../_types/IActivityList";

type ListDropDownProps = {
    onListSelect: (activityListId: number | null, trip_id: number | null) => void;
};

export default function ListDropDown({ onListSelect }: ListDropDownProps) {
  const [lists, setLists] = useState<IFullActivityList[]>([]);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const token = sessionStorage.getItem("authToken");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/activities/lists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data: IFullActivityList[]) => setLists(data))
      .catch((error) => setError(error.message || "Failed to load lists."));
  }, []);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const listId = Number(event.target.value);
    setSelectedList(listId);
    const selectedList = lists.find((list) => list.id === listId);

    setSelectedList(listId);
    onListSelect(listId, selectedList?.trip_id ?? null); 
  };

  return (
    <div className="flex flex-col items-center p-4">
      <label htmlFor="list-drop-down" className="mb-2 text-lg font-medium text-cyan-200">
        Select a List
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <select
        id="list-drop-down"
        className="w-full max-w-sm p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-800"
        value={selectedList ?? ""}
        onChange={handleSelection}
      >
        <option value="" disabled>
          -- Select a List --
        </option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
    </div>
  );
}
