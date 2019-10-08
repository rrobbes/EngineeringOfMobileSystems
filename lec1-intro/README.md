# Mobile Systems Engineering

## Course Format

- Tuesdays 14:00–16:00: lecture
- Tuesdays 16:00-18:00: labs
- Thursdays 08:00–10:00: lecture

For office hours, coordinate meeting via email. My office: Piazza Domenicani 3, office 1.16

## Evaluation

- 50%: exam
- 50%: assignments

## Assignments
- Only practical experience ensures you master the concepts seen in class
- Start early! Work regularly to avoid last-minute issues
- Use GitHub
- You can’t pass the class without approving the assignments!

## Teaching material

- The course is based in part on (Harvard's CS50 course)[https://cs50.github.io/mobile/]. 
- OLE is at: [https://ole.unibz.it/course/view.php?id=4078]
- But we will store the course material here on GitHub

Other references:
- [React website](https://reactjs.org)
- [React native website](https://facebook.github.io/react-native/)
- [Expo](https://expo.io) and its [documentation](https://docs.expo.io/versions/latest/)

All these websites have lots of documentation, tutorials, API references. You are expected to consult them when you need it.

# Why mobile?

Mobile devices are everywhere. They are still growing in popularity and are used daily, as they are affordable and of a convenient size to be carried almost anywhere. 

Starting in 2009, more people accessed the internet with mobile devices than computers.

Mobile devices have lots of hardware possibilities
- High-definition touch screens
- Camera(s)
- Media player
- Internet connectivity
- GPS
- Accelerometers, barometers
- Augmented reality
- Cloud or on-device ML
- Access to many web services

## A brief history of mobile

In the beginning, the devices were very limited, and required coding in low-level C or C++. Applications were tied to specific hardware: a single device or a range of devices.

Platforms such as **Symbian** were created to provide a wider target audience. Symbian (1998-2014) provided developers with a wider target audience. Hundreds of millions of smartphones running Symbian were sold. However:

- They required developers to write complex C/C++ 
- Use of proprietary APIs led to fragmentation
- Symbian had limited access to hardware capabilities
- Symbian gave different weight to native and third party apps

**Java ME (Micro Edition)** introduced the Mobile Information Device Profile (MIDP) specification, to abstract away the underlying hardware. This allowed to create applications that run on the wide variety of devices that support the Java run time. However, there were still restricted access to the device hardware, and sandboxed executions. Furthermore, Java ME was for very limited devices (160-512KB memory), e.g. IoT nowadays.

Modern OSes, such as **Android and iOS** Provide a rich and simplified developmentenvironment, in which hardware access is available to all applications. These devices are much more powerful as well. However, there is still the issue that two platforms exist, and will exist for the foreseable future. This has the issue that supporting both platforms is a lot of work, as they have different languages, frameworks, and APIs.

Moreover, teaching both iOS and Android development in a 60 hours class is logistically not feasible.

## Cross-platform Mobile development

There has been a variety of cross-platform development options:
- [Cordova](https://en.wikipedia.org/wiki/Apache_Cordova)
- [Ionic](https://en.wikipedia.org/wiki/Ionic_(mobile_app_framework))
- [Xamarin](https://en.wikipedia.org/wiki/Xamarin)
- [React Native](https://en.wikipedia.org/wiki/React_Native)
- [Flutter](https://en.wikipedia.org/wiki/Flutter_(software))

Most of these have the issues that they don't use native UI components, which make the applications second-class citizens. The exceptions are Xamarin and React Native.

## React Native

React Native is a platform to develop mobile UIs, which has several desirable characteristics:

- It is cross platform, but has native widgets.
- RN can support purely native views in Java, Kotlin, Objective-C or Swift if needed
- RN supports "live programming" and fast feedback of changes, which is very useful when developing.
- It promotes good programming practices, being in particular influenced by functional programming concepts.
- The React paradigm has influenced several modern UI frameworks, so the concepts behind React are applicable in a broader context.

In particular, React has influenced:
- SwiftUI, the new UI framework for iOS
- Jetpack Compose, the new UI framework for Android
- Flutter, the cross-platform UI framework

# React




