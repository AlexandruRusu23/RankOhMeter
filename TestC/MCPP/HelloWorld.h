#using <mscorlib.dll>
#using "CSharpHelloWorld.netmodule"

using namespace System;

public __gc class HelloWorldC
{
    public:
        // Provide .NET interop and garbage collecting to the pointer.
        CSharpHelloWorld __gc *t;
        HelloWorldC() {
            t = new CSharpHelloWorld();
            // Assign the reference a new instance of the object
        }
        
     // This inline function is called from the C++ Code
        void callCSharpHelloWorld() {
            t->displayHelloWorld();
        }
};