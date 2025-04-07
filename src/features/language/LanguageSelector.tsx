import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./useLanguage";
import { languages, currencies } from "./languageData";

const LanguageSelector = () => {
  const { language, setLanguage, currency, setCurrency } = useLanguage();
  const [activeTab, setActiveTab] = useState<"language" | "currency">("language");
  
  const currentLanguage = languages.find(lang => lang.code === language);
  const currentCurrency = currency;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === "language" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("language")}
          >
            Language
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === "currency" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </div>
        
        {activeTab === "language" ? (
          <>
            <DropdownMenuLabel>
              Current: {currentLanguage?.flag} {currentLanguage?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className={`cursor-pointer ${lang.code === language ? "bg-gray-100" : ""}`}
                  onClick={() => setLanguage(lang.code)}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </div>
          </>
        ) : (
          <>
            <DropdownMenuLabel>
              Current: {currentCurrency.symbol} {currentCurrency.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {currencies.map((curr) => (
                <DropdownMenuItem
                  key={curr.code}
                  className={`cursor-pointer ${curr.code === currency.code ? "bg-gray-100" : ""}`}
                  onClick={() => setCurrency(curr.code)}
                >
                  <span className="mr-2">{curr.symbol}</span>
                  {curr.name} ({curr.code})
                </DropdownMenuItem>
              ))}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
