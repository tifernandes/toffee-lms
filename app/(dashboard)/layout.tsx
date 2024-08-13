
const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full w-full">
      <main className="h-full">
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;