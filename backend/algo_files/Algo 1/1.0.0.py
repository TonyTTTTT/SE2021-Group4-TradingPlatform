import tkinter as tk
import sketch as sketch
import cartoon as cartoon
import old as old
import oil as oil
import water as water
import cv2
# pip install pillow
from PIL import Image, ImageTk


class Window(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.master = master
        self.frame1 = tk.Frame(self.master)
        self.frame1.pack(side='left')
        self.frame2 = tk.Frame(self.master)
        self.frame2.pack(side ='left')
        self.frame3 = tk.Frame(self.master)
        self.frame3.pack(side ='right')

        self.styleOption = tk.IntVar() 
        self.styleOption.set(4)
        self.labelImg1 = tk.Label(self.frame1,background="green")
        self.labelImg1.pack(side='left')
        self.labelImg2 = tk.Label(self.frame3,background="red")
        self.labelImg2.pack(side='right')

        #frame2
        inputLabel = tk.Label(self.frame2,text = "Input image:")
        inputLabel.grid(column=0, row=1, sticky="W")
        self.input = tk.Entry(self.frame2)
        self.input.insert(tk.END,'./test_image/villa.jpg')
        self.input.grid(column=0, row=2, sticky="W")

        outputLabel = tk.Label(self.frame2,text = "Output image:")
        outputLabel.grid(column=0, row=3, sticky="W")
        self.output = tk.Entry(self.frame2)
        self.output.insert(tk.END,'output.jpg')
        self.output.grid(column=0, row=4, sticky="W")

        r1 = tk.Radiobutton(self.frame2,  variable=self.styleOption, text='Old',value=1)
        r2 = tk.Radiobutton(self.frame2,  variable=self.styleOption, text='Oil',value=2)
        r3 = tk.Radiobutton(self.frame2,  variable=self.styleOption, text='Cartoon',value=3)
        r4 = tk.Radiobutton(self.frame2,  variable=self.styleOption, text='Sketch',value=4)
        r5 = tk.Radiobutton(self.frame2,  variable=self.styleOption, text='WaterColor',value=5)

        r1.grid(column=0, row=5, sticky="W")
        r2.grid(column=0, row=6, sticky="W")
        r3.grid(column=0, row=7, sticky="W")
        r4.grid(column=0, row=8, sticky="W")
        r5.grid(column=0, row=9, sticky="W")
        self.bar = tk.Scale(self.frame2, label='Fade', from_=0.0, to=1.0, orient=tk.HORIZONTAL,
             length=300, showvalue=0, tickinterval=0.1, resolution=0.1)
        self.bar.grid(column=0, row=10)
        
        outputButton = tk.Button(self.frame2, text ="Output",height=3,width=10,command = self.outputImage)
        outputButton.grid(column=0, row=13)

        self.setImage1()
        self.setImage2()
        
        self.pack(fill=tk.BOTH, expand=1)
       
    def outputImage(self):

        self.setImage1()
        self.setImage2()

    def setImage1(self):
        load = Image.open(self.input.get())
        load.thumbnail( (500,500) )
        render = ImageTk.PhotoImage(load)
        self.labelImg1.configure(image = render)
        self.labelImg1.image = render


    def setImage2(self):
        outImg = None
        if  self.styleOption.get() == 1 :
            old.oldPainting(self.input.get(),self.output.get())
        elif self.styleOption.get() == 2:
            oil.oilPainting(self.input.get(),self.output.get(), 3, 8, 2)
        elif self.styleOption.get() == 3:
            cartoon.cartoonPainting(self.input.get(),self.output.get())
        elif self.styleOption.get() == 4:
            sketch.sketchPainting(self.input.get(),self.output.get())
        elif self.styleOption.get() == 5:
            water.waterColor(self.input.get(),self.output.get())
        # blend and resize
        img = self.blend(cv2.imread(self.input.get()),cv2.imread(self.output.get()),self.bar.get())
        cv2.imwrite(self.output.get(), img)

        load = Image.open(self.output.get())
        load.thumbnail((500,500),Image.ANTIALIAS)
        render = ImageTk.PhotoImage(load)
         
        self.labelImg2.configure(image = render)

        self.labelImg2.image = render
 
    def blend(self,src1,src2,fade):
        overlapping = cv2.addWeighted(src1,fade , src2, 1.0-fade, 0)
        return overlapping



root = tk.Tk()
app = Window(root)

root.wm_title("Tkinter window")
root.geometry("1024x768")
root.mainloop()