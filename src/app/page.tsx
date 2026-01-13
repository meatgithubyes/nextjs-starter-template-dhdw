import Image from "next/image";

export const revalidate = 120; // Revalidate every 120 seconds (2 minutes)

let revalidationCount = 0;

async function fetchData() {
  try {
    console.log('Fetching data from API...');
    const response = await fetch('https://testingslateruntime-117631035.development.localcatalystserverlessinteg1.com/server/slatetest/execute', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 120 }
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API data received:', data);
    return data;
  } catch (error: any) {
    console.error('Detailed error:', error);
    console.error('Error cause:', error.cause);
    return { 
      error: error.message || String(error),
      cause: error.cause ? String(error.cause) : 'Unknown cause',
      timestamp: new Date().toISOString()
    };
  }
}

export default async function Home() {
  // Increment counter and capture timestamp on each revalidation
  revalidationCount++;
  const currentTimestamp = new Date().toISOString();
  const apiData = await fetchData();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center row-start-2 gap-8 sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly!!!!.</li>
          <li className="mb-2">
            Last revalidated at:{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded">
              {currentTimestamp}
            </code>
          </li>
          <li>
            Revalidation count:{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              {revalidationCount}
            </code>
          </li>
          {apiData && (
            <li className="mb-2">
              API Response:{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded">
                {JSON.stringify(apiData)}
              </code>
            </li>
          )}
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
        
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
    
    </div>
  );
}
