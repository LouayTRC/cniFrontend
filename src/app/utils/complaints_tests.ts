[
  {
    "input": {
      "title": "My phone was stolen and I lost access",
      "description": "Someone took my device and I suspect my Mobile ID is compromised"
    },
    "expected": {
      "category": "REVOCATION",
      "priority": "URGENT"
    }
  },
  {
    "input": {
      "title": "Forgot my PIN code",
      "description": "I cannot log in because I forgot my PIN"
    },
    "expected": {
      "category": "PIN_RESET",
      "priority": "MEDIUM"
    }
  },
  {
    "input": {
      "title": "Mobile ID activation failed",
      "description": "The digital identity registration does not complete"
    },
    "expected": {
      "category": "DIGITAL_ID",
      "priority": "HIGH"
    }
  },
  {
    "input": {
      "title": "Change my phone number",
      "description": "I changed my SIM card and need to update my account"
    },
    "expected": {
      "category": "PHONE_CHANGE",
      "priority": "MEDIUM"
    }
  },
  {
    "input": {
      "title": "Update my personal information",
      "description": "I need to change my email and address in my profile"
    },
    "expected": {
      "category": "REQUEST_UPDATE",
      "priority": "LOW"
    }
  },
  {
    "input": {
      "title": "System shows unknown error",
      "description": "An unexpected issue occurs when using the service"
    },
    "expected": {
      "category": "OTHER",
      "priority": "LOW"
    }
  },
  {
    "input": {
      "title": "Account access suspicious activity",
      "description": "I think someone is trying to access my identity without permission"
    },
    "expected": {
      "category": "REVOCATION",
      "priority": "HIGH"
    }
  },
  {
    "input": {
      "title": "PIN blocked after attempts",
      "description": "Too many wrong attempts locked my account"
    },
    "expected": {
      "category": "PIN_RESET",
      "priority": "HIGH"
    }
  },
  {
    "input": {
      "title": "Digital certificate invalid",
      "description": "My identity certificate is not recognized by the system"
    },
    "expected": {
      "category": "DIGITAL_ID",
      "priority": "HIGH"
    }
  },
  {
    "input": {
      "title": "Profile correction request",
      "description": "My address is wrong and needs to be updated"
    },
    "expected": {
      "category": "REQUEST_UPDATE",
      "priority": "LOW"
    }
  }
]