"use client";

import Link from "next/link";

const mockData = [
  { id: 1, train_id: 1, station_id: 1, pause: 1, duration: 1 },
  { id: 2, train_id: 1, station_id: 1, pause: 1, duration: 1 },
  { id: 3, train_id: 1, station_id: 1, pause: 1, duration: 1 },
  { id: 4, train_id: 1, station_id: 1, pause: 1, duration: 1 },
  { id: 5, train_id: 1, station_id: 1, pause: 1, duration: 1 },
  { id: 6, train_id: 1, station_id: 1, pause: 1, duration: 1 },
  { id: 7, train_id: 1, station_id: 1, pause: 1, duration: 1 },
];

const StationsPage = () => {
  const data = mockData;
  return (
    <div>
      <h1>Станции</h1>
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Расписание</div>
          </header>

          <div className="overflow-x-auto p-3">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400 ">
                <tr>
                  <th className="p-2">
                    <div className="text-left font-semibold">Код станции</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Номер поезда</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Стоянка</div>
                  </th>
                  <th className="p-2">
                    <div className="text-center font-semibold">Время в пути</div>
                  </th>
                  <th aria-label="action" className="p-2" />
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {data.map((d) => (
                  <tr key={d.id} className="hover:bg-primary/50 ">
                    <td className="p-2">
                      <Link className="font-medium text-default" href={`/stations/${d.id}`}>
                        {d.station_id}
                      </Link>
                    </td>
                    <td className="p-2">
                      <div className="text-left text-default">{d.train_id}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left font-medium text-green-500">{d.pause} мин</div>
                    </td>
                    <td className="p-2 text-default">{d.duration}</td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <button type="button">
                          <svg
                            className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationsPage;
