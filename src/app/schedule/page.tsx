"use client";

const SchedulePage = () => {
  // eslint-disable-next-line no-console
  console.log(process.env.VERCEL_URL);
  // eslint-disable-next-line no-console
  console.log(process.env.NEXT_PUBLIC_GQL_URL);
  return (
    <div>
      <h1>Schedule</h1>
    </div>
  );
};

export default SchedulePage;
