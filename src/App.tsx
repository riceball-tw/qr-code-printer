import { useState } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function App() {
  const [inputValues, setInputValues] = useState(["https://example.com"]);
  const [minColWidth, setColNumber] = useState(50);
  const [isShowCurrentDate, setIsShowCurrentDate] = useState(false)
  const [isShowQrCodeIndex, setIsShowQrCodeIndex] = useState(true)
  const [paperHeading, setPaperHeading] = useState('Print QR Codes Demo')
  const mmToPxRatio = 3.7795

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar */}
        <ResizablePanel defaultSize={30} maxSize={30} minSize={15} className="md:border-t-0 border-t-2 border-black p-4 print:hidden !overflow-auto md:static md:max-h-none fixed bottom-0 max-h-60 bg-white w-full z-10 md:min-h-screen">
          {/* Logo and Logomark */}
          <div className="mb-8">
            <h1 className=" flex flex-wrap gap-2 items-center text-3xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 10V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v6q0 .425-.288.713T10 11H4q-.425 0-.712-.288T3 10m2-1h4V5H5zM3 20v-6q0-.425.288-.712T4 13h6q.425 0 .713.288T11 14v6q0 .425-.288.713T10 21H4q-.425 0-.712-.288T3 20m2-1h4v-4H5zm8-9V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v6q0 .425-.288.713T20 11h-6q-.425 0-.712-.288T13 10m2-1h4V5h-4zm4 12v-2h2v2zm-6-6v-2h2v2zm2 2v-2h2v2zm-2 2v-2h2v2zm2 2v-2h2v2zm2-2v-2h2v2zm0-4v-2h2v2zm2 2v-2h2v2z"/></svg>
            Print QR Codes
            </h1>
            <p className="italic text-gray-700">Generate QR Codes to paper for easy and fast print!</p>
          </div>
          <Accordion type="multiple">
            {/* Content */}
            <AccordionItem value="item-content">
              <AccordionTrigger className="text-lg">
                <span className="inline-flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 14q-.425 0-.712-.288T4 13t.288-.712T5 12h5q.425 0 .713.288T11 13t-.288.713T10 14zm0-4q-.425 0-.712-.288T4 9t.288-.712T5 8h9q.425 0 .713.288T15 9t-.288.713T14 10zm0-4q-.425 0-.712-.288T4 5t.288-.712T5 4h9q.425 0 .713.288T15 5t-.288.713T14 6zm8 13v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T15.65 20H14q-.425 0-.712-.287T13 19m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14.5 18.5h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm0 0v-.95l3.05-3.025l.925.925l-3.025 3.05z"/></svg>
                Content Settings
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 m-1" >
                <div className="w-full flex flex-wrap flex-col gap-2">
                  <Label htmlFor="heading">Heading</Label>
                  <Input
                  id="heading"
                  value={paperHeading}
                  className="w-full"
                  onChange={(e) => {setPaperHeading(e.target.value)}}
                  ></Input>                    
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="isShowCurrentDate">Show Generated Date</Label>
                    <Switch id="isShowCurrentDate" onCheckedChange={(isShow) => setIsShowCurrentDate(isShow)} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="isShowQrCodeIndex">Show QR Code Index</Label>
                    <Switch id="isShowQrCodeIndex" onCheckedChange={(isShow) => setIsShowQrCodeIndex(isShow)} />
                  </div>
                </div>


                <div className="space-y-2 ">
                  {inputValues.map((value, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-2">
                      <Label htmlFor={`qrcode-${index}`}>#{ index + 1}</Label>
                      <Input
                        id={`qrcode-${index}`}
                        className="flex-1"
                        style={{minWidth: '100px'}}
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const handleInputChange = (index: number, value: string) => {
                            const newValues = [...inputValues];
                            newValues[index] = value;
                            setInputValues(newValues);
                          };
                          handleInputChange(index, e.target.value)
                        }}
                        placeholder={`Enter text for QR Code ${index + 1}`}
                      />
                      <Button
                        variant={'destructive'}
                        onClick={() => {
                          const newValues = inputValues.filter((_, i) => i !== index);
                          setInputValues(newValues);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={() => {
                      setInputValues([...inputValues, ""]);
                    }}
                  >
                    Add New QR Code
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Layout */}
            <AccordionItem value="item-layout">
              <AccordionTrigger className="text-lg">
              <span className="inline-flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5q-.425 0-.712-.288T3 4t.288-.712T4 3t.713.288T5 4t-.288.713T4 5m4 0q-.425 0-.712-.288T7 4t.288-.712T8 3t.713.288T9 4t-.288.713T8 5m4 0q-.425 0-.712-.288T11 4t.288-.712T12 3t.713.288T13 4t-.288.713T12 5m4 0q-.425 0-.712-.288T15 4t.288-.712T16 3t.713.288T17 4t-.288.713T16 5m4 0q-.425 0-.712-.288T19 4t.288-.712T20 3t.713.288T21 4t-.288.713T20 5M4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m16 0q-.425 0-.712-.288T19 8t.288-.712T20 7t.713.288T21 8t-.288.713T20 9M4 13q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m16 0q-.425 0-.712-.288T19 12t.288-.712T20 11t.713.288T21 12t-.288.713T20 13M4 17q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17m16 0q-.425 0-.712-.288T19 16t.288-.712T20 15t.713.288T21 16t-.288.713T20 17M4 21q-.425 0-.712-.288T3 20t.288-.712T4 19t.713.288T5 20t-.288.713T4 21m4 0q-.425 0-.712-.288T7 20t.288-.712T8 19t.713.288T9 20t-.288.713T8 21m4 0q-.425 0-.712-.288T11 20t.288-.712T12 19t.713.288T13 20t-.288.713T12 21m4 0q-.425 0-.712-.288T15 20t.288-.712T16 19t.713.288T17 20t-.288.713T16 21m4 0q-.425 0-.712-.288T19 20t.288-.712T20 19t.713.288T21 20t-.288.713T20 21M9 17q-.825 0-1.412-.587T7 15V9q0-.825.588-1.412T9 7h6q.825 0 1.413.588T17 9v6q0 .825-.587 1.413T15 17zm0-2h6V9H9z"/></svg>
                Layout Settings
                </span>
              </AccordionTrigger>
              <AccordionContent className="m-1">
                <Label htmlFor='minQrCodeWidth' className="mb-2 inline-block">{`Minimum QR Code Width (${minColWidth}mm)`}</Label>
                <Slider
                  id="minQrCodeWidth"
                  value={[minColWidth]}
                  onValueChange={(newValue) => setColNumber(newValue[0])}
                  max={100}
                  min={10}
                  step={1}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            className="w-full"
            onClick={() => {window.print()}}
          >
          Print
          </Button>
        </ResizablePanel>

        <ResizableHandle withHandle className="print:hidden hidden md:flex"/>
        
        {/* Print section */}
        <ResizablePanel defaultSize={70} className="bg-black flex justify-center print:justify-start !overflow-visible">
          {/* Paper */}
          <div style={{maxWidth: "210mm", maxHeight: 'auto', minHeight: '297mm'}} className="bg-white h-fit w-full p-4 flex flex-col overflow-visible justify-between">
            <div>
            {/* Descripations */}
              <div className="flex flex-wrap justify-between items-center mb-4">
                {
                  paperHeading ? <h2 className="text-2xl font-bold">{paperHeading}</h2> : ''
                }
                {
                  isShowCurrentDate && <div className="whitespace-nowrap">Generated at: {new Date().toLocaleString()}</div>
                }
              </div>

              <div style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}mm, 1fr))`}} className="grid gap-4">
                {inputValues.map((value, index) => (
                  value && (
                    <div key={index} className="border-black border-2 p-2 text-center relative">
                      <QRCode className='w-full' value={value} size={minColWidth * mmToPxRatio} />
                      <p className="mt-2 text-sm break-words">{value}</p>
                      
                      {
                        isShowQrCodeIndex && <div className="absolute top-0 left-0 bg-white p-1">#{index + 1}</div>
                      }
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
