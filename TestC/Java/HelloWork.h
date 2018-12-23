#include <jni.h>
/* Header for class Test1 */

#ifndef _Included_Test1
#define _Included_Test1
#ifdef __cplusplus
extern "C" {
#endif
/*
 * Class:     Test1
 * Method:    displayHelloWorld
 * Signature: (Ljava/lang/String;)V
 */
JNIEXPORT void JNICALL Java_Test1_displayHelloWorld
  (JNIEnv *, jobject);

#ifdef __cplusplus
}
#endif
#endif