
const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full w-full">
      <main className="md:pl-[60px] md:pt-[5px] pt-[45px] h-full">
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;