// TestC.cpp : Defines the entry point for the console application.
//
#include <jni.h>
#include "Java\HelloWorld.h"

// The Managed C++ header containing the call to the C#
#include "MCPP\HelloWorld.h"

// This is the JNI call to the Managed C++ Class
// NOTE: When the java header was created, the package name was not include in the JNI call.
// This naming convention was corrected by adding the 
// "helloworld" name following the following syntax: 
// Java_<package name>_<class name>_<method name>
JNIEXPORT void JNICALL Java_Test1_displayHelloWorld(JNIEnv *jn, jobject jobj) {

	// Instantiate the MC++ class.
	HelloWorldC* t = new HelloWorldC();

	// The actual call is made. 
	t->callCSharpHelloWorld();
}